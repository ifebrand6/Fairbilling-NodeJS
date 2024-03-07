function sortEvents(events) {
  const startEvents = events.filter((event) => getType(event) === "Start");
  const sortedEvents = [];

  for (const startEvent of startEvents) {
    const endEvent = events.find(
      (event) =>
        getType(event) === "End" &&
        getTime(event) > getTime(startEvent) &&
        !sortedEvents.includes(event)
    );

    if (endEvent) {
      sortedEvents.push(startEvent);
      sortedEvents.push(endEvent);
    }
  }

  // Add isolated "End" events to the end of the array
  const isolatedEnds = events.filter(
    (event) => getType(event) === "End" && !sortedEvents.includes(event)
  );
  sortedEvents.push(...isolatedEnds);

  // Add isolated "Start" events to the end of the array
  const isolatedStarts = events.filter(
    (event) => getType(event) === "Start" && !sortedEvents.includes(event)
  );
  sortedEvents.push(...isolatedStarts);

  return sortedEvents;
}

function getTime(event) {
  return event.split(" ")[0];
}

function getType(event) {
  return event.split(" ")[2];
}
module.exports = {sortEvents};



