import React from 'react'

export default function ProgressBar({percentage,barType}) {
    console.log("per" + percentage)
    return (
        <div className="progress">
            <div className={barType}  role="progressbar" style={{ width: `${percentage}%` }} aria-valuenow={percentage}
                aria-valuemin="0" aria-valuemax="100">{percentage}%</div>
        </div>
    )
}
