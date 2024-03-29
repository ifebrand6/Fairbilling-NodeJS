const sampleData =`
14:02:03 ALICE99 Start
14:02:05 CHARLIE End
14:02:34 ALICE99 End
14:02:58 ALICE99 Start
14:03:02 CHARLIE Start
14:03:33 ALICE99 Start
14:03:35 ALICE99 End
14:03:37 CHARLIE End
14:04:05 ALICE99 End
14:04:23 ALICE99 End
14:04:41 CHARLIE Start
`
const InvalidData =
  `14:00:00 ALICE99 Start
14:00:00 CHARLIE Start
14:00:01 CHARLIE End
14:00:01 ALICE99 End`

const unRefinedData =
  `01:00:00 ALICE99 Start
01:00:01 CHARLES Start
01:00:02 CHARLES End
01:00:04 ALICE99 End
01:00:04 ALICE99 End
01:30PM ALICE99 End
`
const emptySampleData = ``

const badTimeFormatData =
  `12am ALICE99 Start
15:30 CHARLES Start
00:02 CHARLES End
10PM ALICE99 End
`

module.exports = {
  sampleData,
  InvalidData,
  unRefinedData,
  emptySampleData,
  badTimeFormatData
};
