import React from 'react'

export default function ProgressBar(percentage) {
    console.log("per" + percentage.percentage)
    return (
        <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: `${percentage.percentage}%` }} aria-valuenow={percentage.percentage}
                aria-valuemin="0" aria-valuemax="100">{percentage.percentage}%</div>
        </div>
    )
}
