package utils

func KMPMatch(dna string, disease string) bool {
	lenDisease := len(disease)
	lenDna := len(dna)

	if lenDisease > lenDna {
		return false
	}

	return false
}

func LongestPrefixSuffix(disease string) []int {
	lenDisease := len(disease)
	var lps = make([]int, lenDisease)
	lps[0] = 0

	var i, j int
	j = 0
	i = 1
	for i < lenDisease {
		if disease[i] == disease[j] {
			lps[i] = j + 1
			i++
			j++
		} else {
			if j != 0 {
				j = lps[j-1]
			} else {
				lps[i] = 0
				i++
			}
		}
	}

	return lps
}
