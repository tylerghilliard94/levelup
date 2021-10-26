import React, { useState } from "react"




/*
    Must profile a default value for the `events` property
    so that React doesn't throw an error when you try to
    iterate the events array in the view.
*/


export const getProfile = () => {
    return fetch("http://localhost:8000/profile", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())

}



