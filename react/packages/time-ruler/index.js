import React, { useState, useEffect, useRef } from 'react'
import './index.less'
import Ruler from './manage.js'
import DateItem from "./dateItem"

const TimeRuler = (date = new Date()) => {
	const RulerBody = useRef(null)
	const rulePage = useRef(null)
	const scrollRule = useRef(null)
	const [ruler, setRuler] = useState({
		list: [],
		day: '',
		nowTime: '',
		itemWidth: 108,
		type: 0
	})
	const [update, setUpdate] = useState(false)
	let ru = {}

	useEffect(() => {
		ru = new Ruler(RulerBody.current, rulePage.current, scrollRule.current, date,
			() => {
			},
			(r) => {
				setRuler({
					...r
				})

			})
		setUpdate(true)
	}, [])

	useEffect(() => {
		if (ru.el) {
			ru.createScroll()
		}
	}, [update])
	useEffect(() => {
		return () => {
			ru.destroy()
		}
	}, [])


	return (
		<div className="time-ruler" ref={ RulerBody }>
			<div className="scroll-wrapper" ref={ rulePage }>
				<div className="scroll-content" ref={ scrollRule }>
					{
						ruler.list.map((item) => {
							return (<DateItem key={ item } day={ item } itemWidth={ ruler.itemWidth }
											  type={ ruler.type }></DateItem>)
						})
					}
				</div>
				<div className="ruler-center-line"></div>
				<div className="ruler-center-line-time">{ ruler.day } { ruler.nowTime }</div>
			</div>
		</div>
	)
}

export default React.memo(TimeRuler)
