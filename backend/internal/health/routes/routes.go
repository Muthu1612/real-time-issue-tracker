package routes

import (
	"github.com/gin-gonic/gin"
	healthcontroller "real-time-issue-tracker/backend/internal/health/controller"
)

// RegisterRoutes attaches the health routes to the provided router.
func RegisterRoutes(router gin.IRoutes, controller *healthcontroller.Controller) {
	router.GET("/health", controller.Get)
}