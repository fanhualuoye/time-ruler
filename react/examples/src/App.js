import './App.css';
import TimeRuler from 'time-ruler-react'

function App() {

	const changeTime = (time) => {
		console.log('changeTime', time)
	}
	const change = (time) => {
		console.log('change', time)
	}
	return (
		<div className="App">
			<TimeRuler change={change} changeTime={changeTime}></TimeRuler>
		</div>
	);
}

export default App;
