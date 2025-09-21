import { useDispatch, useSelector } from "react-redux";
import { incrementTime } from "../../redux/timemachine/timemachineSlice.js"
import { useEffect } from "react";

// Function that makes the time flow by 1 second
function TimeFlow ({children}) {
    const dispatch = useDispatch();
    const isFlowing = useSelector((state) => state.time.isFlowing);

    useEffect (() => {
        let interval;
        if(isFlowing) {
            interval = setInterval(() => {
                dispatch(incrementTime(1000));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isFlowing, dispatch]);
    return children;
}

export default TimeFlow;