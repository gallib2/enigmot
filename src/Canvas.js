import React, { useState, useRef, useEffect } from 'react';
import { v4 } from 'uuid';

const Canvas = () => {
    const [isPainting, setIsPainting] = useState(false);
    const [prevPos, setPrevPos] = useState({ offsetX: 0, offsetY: 0 });
    const [userStrokeStyle, setUserStrokeStyle] = useState('#EE92C2');
    const [guestStrokeStyle, setGuestStrokeStyle] = useState('#F0C987');
    const [line, setLine] = useState([]);
    const [ctx, setCtx] = useState(null);
    // v4 creates a unique id for each user. We used this since there's no auth to tell users apart
    const [userId, setUserId] = useState(v4());

    const canvas = useRef(null)

    useEffect(() => {
        // Here we set up the properties of the canvas element. 
        canvas.current.width = 1000;
        canvas.current.height = 800;
        setCtx(canvas.current.getContext('2d'));
    }, [])

    useEffect(() => {
        if(ctx) {
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.lineWidth = 5;
        }
    }, [ctx])

    const onMouseDown = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setIsPainting(true);
        setPrevPos({ offsetX, offsetY });
    }

    const onMouseMove = ({ nativeEvent }) => {
        if (isPainting) {
            const { offsetX, offsetY } = nativeEvent;
            const offSetData = { offsetX, offsetY };
            // Set the start and stop position of the paint event.
            const positionData = {
                start: { ...prevPos },
                stop: { ...offSetData },
            };
            // Add the position to the line array
            setLine(line.concat(positionData));
            paint(prevPos, offSetData, userStrokeStyle);
        }
    }
    const endPaintEvent = () => {
        if (isPainting) {
            setIsPainting(false);
            // sendPaintData();
        }
    }
    const paint = (prevPos, currPos, strokeStyle) => {
        const { offsetX, offsetY } = currPos;
        const { offsetX: x, offsetY: y } = { ...prevPos };

        ctx.beginPath();
        ctx.strokeStyle = strokeStyle;
        // Move the the prevPosition of the mouse
        ctx.moveTo(x, y);
        // Draw a line to the current position of the mouse
        ctx.lineTo(offsetX, offsetY);
        // Visualize the line using the strokeStyle
        ctx.stroke();
        setPrevPos({ offsetX, offsetY });
    }

    const sendPaintData = async () => {
        const body = {
            line: line,
            userId: userId,
        };
        // We use the native fetch API to make requests to the server
        const req = await fetch('http://localhost:4000/paint', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
            },
        });
        const res = await req.json();
        setLine([]);
    }

    return (
        <canvas
            // We use the ref attribute to get direct access to the canvas element. 
            ref={canvas}
            style={{ background: 'black' }}
            onMouseDown={onMouseDown}
            onMouseLeave={endPaintEvent}
            onMouseUp={endPaintEvent}
            onMouseMove={onMouseMove}
        />
    );
}
export default Canvas;