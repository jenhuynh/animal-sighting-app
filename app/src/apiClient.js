//sighting function
export const getSightings = async () => {
  const response = await fetch("/api/sightings");
  return response.json();
};

export const addSighting = async (sighting) => {
  const response = await fetch("/api/sightings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sighting),
  });
  return response.json();
};
