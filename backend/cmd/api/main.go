package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	healthcontroller "real-time-issue-tracker/backend/internal/health/controller"
	healthroutes "real-time-issue-tracker/backend/internal/health/routes"
	healthservice "real-time-issue-tracker/backend/internal/health/service"

	"github.com/gin-gonic/gin"
)

type config struct {
	port            string
	shutdownTimeout time.Duration
}

func loadConfig() config {
	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}

	return config{
		port:            port,
		shutdownTimeout: 5 * time.Second,
	}
}

func newRouter() *gin.Engine {
	gin.SetMode(gin.ReleaseMode)

	router := gin.New()
	router.Use(gin.Logger(), gin.Recovery())

	healthService := healthservice.NewService()
	healthController := healthcontroller.NewController(healthService)
	healthroutes.RegisterRoutes(router, healthController)

	return router
}

func main() {
	if err := run(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		log.Fatal(err)
	}
}

func run() error {
	cfg := loadConfig()
	router := newRouter()

	server := &http.Server{
		Addr:              ":" + cfg.port,
		Handler:           router,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       10 * time.Second,
		WriteTimeout:      10 * time.Second,
		IdleTimeout:       60 * time.Second,
		MaxHeaderBytes:    1 << 20,
	}

	serverErrors := make(chan error, 1)
	go func() {
		log.Printf("api server listening on %s", server.Addr)
		serverErrors <- server.ListenAndServe()
	}()

	signalCh := make(chan os.Signal, 1)
	signal.Notify(signalCh, syscall.SIGINT, syscall.SIGTERM)
	defer signal.Stop(signalCh)

	select {
	case err := <-serverErrors:
		if err != nil {
			return err
		}
		return nil
	case sig := <-signalCh:
		log.Printf("shutdown signal received: %s", sig)
	}

	ctx, cancel := context.WithTimeout(context.Background(), cfg.shutdownTimeout)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		return err
	}

	if err := <-serverErrors; err != nil && !errors.Is(err, http.ErrServerClosed) {
		return err
	}

	log.Println("api server stopped gracefully")
	return nil
}
