package utils

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

// run with go test -v ./...

func TestCalculateSimiliarity(t *testing.T) {
	ratio := CalculateSimiliarity("AACTGATGCATG", "TGCA")
	t.Logf("Ratio: %f", ratio)
}

func TestBMMatch(t *testing.T) {
	verdict := BMMatch("AACTGATGCATG", "TGCA")
	t.Logf("Verdict: %t", verdict)
}

func TestKMPMatch(t *testing.T) {
	verdict := KMPMatch("AACTGATGCATG", "TGCA")
	t.Logf("Verdict: %t", verdict)
}

func TestIsValidDNA(t *testing.T) {
	tests := []struct {
		name string
		dna  string
		want bool
	}{
		{"empty string", "", false},
		{"only 1 letter", "A", true},
		{"random", "ACTGTGGATC", true},
		{"incorrect 1 char", "ACTGTG GATC", false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := IsValidDNA(tt.dna)
			assert.Equal(t, tt.want, got)
		})
	}
}