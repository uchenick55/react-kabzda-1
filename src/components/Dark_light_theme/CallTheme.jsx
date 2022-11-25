import React from 'react'

const CallTheme = ({themeTogglerLocal}) => {
    return (
        <span>
            <img
                className="day-night2"
                src="https://cdn-icons-png.flaticon.com/512/2490/2490365.png"
                onClick={themeTogglerLocal}
                alt="Switch Theme"
                width="50"
            />
        </span>
    );
};
export default CallTheme;
