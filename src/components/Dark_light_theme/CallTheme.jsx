import React from 'react'

const CallTheme = ({themeToggler}) => {
    return (
        <div>
            <img
                className="day-night2"
                src="https://cdn-icons-png.flaticon.com/512/2490/2490365.png"
                onClick={themeToggler}
                alt="Switch Theme"
                width="50"
            />
        </div>
    );
};
export default CallTheme;
