import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getGames } from "../game/GameProvider"
import { createEvent } from "./EventProvider"



export const EventForm = () => {
    const history = useHistory()

    const [currentEvent, setCurrentEvent] = useState({})
    const [games, setGames] = useState([])

    useEffect(() => {

        getGames().then(res => setGames(res))
    }, [])

    const changeDescriptionState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.description = event.target.value
        setCurrentEvent(newEventState)
    }
    const changeGameState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.game_id = event.target.value
        setCurrentEvent(newEventState)
    }
    const changeDateState = (event) => {
        debugger
        const newEventState = { ...currentEvent }
        newEventState.date = event.target.value
        setCurrentEvent(newEventState)
    }
    const changeTimeState = (event) => {
        debugger
        const newEventState = { ...currentEvent }
        newEventState.time = event.target.value
        setCurrentEvent(newEventState)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <div className="form-group">
                <label htmlFor="description">Description: </label>
                <input type="text" name="title" required autoFocus className="form-control"
                    value={currentEvent.description}
                    onChange={changeDescriptionState}
                />
            </div>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={currentEvent.gameId}
                        onChange={changeGameState}>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <div className="form-group">
                <label htmlFor="date">Date: </label>
                <input type="date" name="Date" required autoFocus className="form-control"
                    value={currentEvent.date}
                    onChange={changeDateState}
                />
            </div>
            <div className="form-group">
                <label htmlFor="time">Time: </label>
                <input type="time" name="Time" required autoFocus className="form-control"
                    value={currentEvent.time}
                    onChange={changeTimeState}
                />
            </div>


            {/* Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        organizer: currentEvent.organizer,
                        description: currentEvent.description,
                        game_id: parseInt(currentEvent.game_id),
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
