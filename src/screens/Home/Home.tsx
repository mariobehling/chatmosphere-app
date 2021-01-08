import React, { useState } from 'react';
import { useConferenceStore } from './../../Store/ConferenceStore';
import {useHistory} from 'react-router-dom'
import { conferenceName } from '../../components/JitsiConnection/options';
import { useConnectionStore } from '../../Store/ConnectionStore';

export const Welcome = () => {

	const [sessionName, setName] = useState<string>(conferenceName)
	const { initJitsiMeet } = useConnectionStore()
	const setConferenceName = useConferenceStore(state => state.setConferenceName)
	const history = useHistory()

	const handleChange = (e) => {
		setName(e.target.value)
	}

	

	const onSubmit = (e) => {
		e.preventDefault()
		if(sessionName.length > 0) {
			//set the conference name to use it in enter screen
			//it won't join to conference yet until enter.tsx creates a connection
			setConferenceName(sessionName) 
			initJitsiMeet()
			// history.push(`/enter`)
			history.push(`/session/${sessionName}`)
		}
	}

	return (
		<div>
			<h1>Welcome to Chatmosphere 👋</h1>
			<h3>The Open Source Videochat for Cozy Talks</h3>
			<form onSubmit={onSubmit}>
				<label>
					Set Session Name
					<input type="text" placeholder={sessionName} onChange={handleChange} id="sessionName" />
				</label>
				<input type="submit" value="Join" />
			</form>
		</div>
	);
};