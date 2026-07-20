package service

import "testing"

func TestDefaultServiceCheck(t *testing.T) {
	service := NewService()

	got := service.Check()
	if got.Status != "ok" {
		t.Fatalf("expected status ok, got %q", got.Status)
	}
}