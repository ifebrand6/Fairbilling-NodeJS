const sampleData =
`14:00:00 ALICE99 Start
14:00:00 CHARLIE Start
14:00:01 CHARLIE End
14:00:01 ALICE99 End
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
