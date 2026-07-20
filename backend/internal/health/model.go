package health

// StatusResponse represents the health payload returned by the API.
type StatusResponse struct {
	Status string `json:"status"`
}