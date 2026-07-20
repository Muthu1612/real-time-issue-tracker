package controller

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	healthmodel "real-time-issue-tracker/backend/internal/health"
)

type stubService struct{}

func (s *stubService) Check() healthmodel.StatusResponse {
	return healthmodel.StatusResponse{Status: "ok"}
}

func TestControllerGet(t *testing.T) {
	gin.SetMode(gin.TestMode)
	controller := NewController(&stubService{})
	rec := httptest.NewRecorder()
	ctx, _ := gin.CreateTestContext(rec)
	ctx.Request = httptest.NewRequest(http.MethodGet, "/health", nil)

	controller.Get(ctx)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected status %d, got %d", http.StatusOK, rec.Code)
	}

	if got := rec.Header().Get("Content-Type"); got != "application/json; charset=utf-8" {
		t.Fatalf("expected content type application/json; charset=utf-8, got %q", got)
	}

	if got := rec.Body.String(); got != "{\"status\":\"ok\"}" {
		t.Fatalf("expected response body {\"status\":\"ok\"}, got %q", got)
	}
}