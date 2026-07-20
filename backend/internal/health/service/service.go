package service

import healthmodel "real-time-issue-tracker/backend/internal/health"

// Service defines the health check business logic.
type Service interface {
	Check() healthmodel.StatusResponse
}

// DefaultService implements Service with static health data.
type DefaultService struct{}

// NewService creates the default health service.
func NewService() Service {
	return &DefaultService{}
}

// Check returns the current health state.
func (s *DefaultService) Check() healthmodel.StatusResponse {
	return healthmodel.StatusResponse{Status: "ok"}
}