// const Sightings = () => {
//     const [sightings, setSightings] = React.useState([]);

//     const getSightings = () => apiClient.getSightings().then(setSightings);
//     React.useEffect(() => {
//       getSightings();
//     }, []);
import * as React from "react";

// import AddSightings from "./dSighting";
import * as apiClient from "./apiClient";

const Sightings = () => {
  const [sightings, setSightings] = React.useState([]);

  const loadSightings = async () => {
    setSightings(await apiClient.getSightings());
    // const results = await apiClient.getSightings();
    // setSightings(results);
    // console.log(results);
  };
  const addSighting = (sightings) =>
    apiClient.addSighting(sightings).then(loadSightings);

  React.useEffect(() => {
    loadSightings();
  }, []);

  return (
    <section>
      <SightingsList sightings={sightings} />
      {/* <AddSightings /> */}
      <AddSightings {...{ addSighting }} />
    </section>
  );
};

const SightingsList = ({ sightings }) => (
  <>
    <h1>Endangered Animal Sightings</h1>
    <ul>
      {sightings.map(
        ({
          id,
          individual_id,
          nickname,
          healthy,
          location,
          date,
          time,
          email,
        }) => (
          <li key={id}>
            {individual_id}, {nickname}, {location}, {healthy.toString()},{" "}
            {email}, {date}, {time}
          </li>
        ),
      )}
    </ul>
  </>
);

const AddSightings = ({ addSighting }) => {
  const [sighting, setSightings] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [healthy, setHealthy] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [individualId, setIndividualId] = React.useState("");

  //making sure sightings input can be added
  const canAdd =
    location !== "" &&
    healthy !== "" &&
    email !== "" &&
    individualId !== "" &&
    date !== "" &&
    time !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    const newSighting = {
      date: date,
      time: time,
      individual_id: individualId,
      location: location,
      healthy: healthy,
      email: email,
    };
    console.log(newSighting);
    if (canAdd) {
      addSighting(newSighting);
      setSightings("");
    }
  };

  // console.log(sighting, location, healthy, email, individualId);
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          placeholder="Enter date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="time">Time</label>
        <input
          id="time"
          type="time"
          name="time"
          placeholder="Enter time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="individual_id">Individual Id:</label>
        <input
          id="individual_id"
          type="integer"
          name="individual_id"
          placeholder="Enter Individual Id"
          value={individualId}
          onChange={(e) => setIndividualId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          type="text"
          name="location"
          placeholder="Enter animal location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="healthy">Healthy:</label>
        <input
          id="healthy"
          type="text"
          name="healthy"
          placeholder="Enter True or False"
          value={healthy}
          onChange={(e) => setHealthy(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* <label>
        New Sightings:{" "}
        <input
          onChange={(e) => setSightings(e.currentTarget.value)}
          value={sighting}
        />
      </label> */}
      <button disabled={!canAdd}>Add</button>
    </form>
  );
};

export default Sightings;
