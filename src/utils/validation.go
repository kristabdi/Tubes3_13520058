package utils

import (
	"regexp"
)

var dnaRegex *regexp.Regexp = regexp.MustCompile("^[ATCG]+$")

func IsValidDNA(s string) bool {
	return dnaRegex.MatchString(s)
}
