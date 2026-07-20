package controller

import (
	"net/http"

	healthservice "real-time-issue-tracker/backend/internal/health/service"

	"github.com/gin-gonic/gin"
)

// Controller handles health requests.
type Controller struct {
	service healthservice.Service
}

// NewController wires a health service into the controller.
func NewController(service healthservice.Service) *Controller {
	return &Controller{service: service}
}

// Get handles GET /health.
func (c *Controller) Get(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, c.service.Check())
}
