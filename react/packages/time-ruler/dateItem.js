import React, { useState } from "react"
import moment from 'moment'
import { typeMap } from "./manage"

const DateItem = ({ day = '', type = '0' }) => {
	const getMinutes = (i, flag) => {
		const m = moment(day, 'YYYY-MM-DD 00:00:00')
		const minutes = typeMap[type].minutes
		return m.add(i * minutes, 'm').format('HH:mm')
	}
	const getHour = (i) => {
		const m = moment(day, 'YYYY-MM-DD 00:00:00')
		return m.add(i, 'h').format('HH:mm')
	}
	const hourNum = 24
	const typeMapFun = {
		'0': {
			getText: getHour
		},
		'1': {
			getText: getMinutes
		},
		'2': {
			getText: getMinutes
		}
	}
	const getText = (i) =>  {
		return typeMapFun[type].getText(i)
	}
	const [multiple] = useState(hourNum * typeMap[type].multiple)
	const childItem = []
	for (let i = 0; i < 10; i++) {
		childItem.push(<span key={i} className="child-item"></span>)
	}
	const list = []
	for (let i = 0; i < multiple; i++) {
		list.push(
			<div className="scroll-date-item" key={i}>
				<div className="scroll-date-number">
					{ getText(i) }
				</div>
				<div className="child-item-box">
					{ childItem }
				</div>
			</div>
		)
	}
	return (
		<div className="scroll-date-list">
			{
				list
			}
		</div>
	)
}

export default React.memo(DateItem)
