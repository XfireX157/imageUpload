import React, { useState, useRef, TouchEvent } from 'react'
import styles from './Compare.module.scss'

export default function Compare() {

    const [imageRevealFraq, setImageRevealFraq] = useState(0.5)
    const imageContainer = useRef(undefined)

    const slide = (xPosition) => {
        const containerBoundingRect = imageContainer.current.getBoundingClientRect()
        setImageRevealFraq(() => {
            if (xPosition < containerBoundingRect.left) {
                return 0
            }else if (xPosition > containerBoundingRect.right) {
                return 1 
            }else {
                return (xPosition - containerBoundingRect.left) / containerBoundingRect.width
            }
        })
    }

    const handleTouchMove = (event) => {
        slide(event.touches.item(0).clientX)
    }

    const handleMouseDown = () => {
        window.onmousemove = handleMouseMove
        window.onmouseup = handleMouseUp
    }

    const handleMouseMove = (e) => {
        slide(e.clientX)
    }

    const handleMouseUp = () => {
        window.onmousemove = undefined
        window.onmouseup = undefined
    }

    return (
        <div className={styles.Container}>
            <div ref={imageContainer} className={styles.Container__boxImg}>
                <img
                    className={styles.Container__boxImg__img1}
                    src="https://thumbs.dreamstime.com/b/ilustração-criativa-abstrata-com-leão-colorido-cor-preta-de-190846410.jpg"
                    alt="imagem colorida" />

                <img
                    style={{
                        filter: "grayscale(100%)",
                        clipPath: `polygon(0 0, ${imageRevealFraq * 100}% 0, ${imageRevealFraq * 100}% 100%, 0 100%)`
                    }}
                    className={styles.Container__boxImg__img2}
                    src="https://thumbs.dreamstime.com/b/ilustração-criativa-abstrata-com-leão-colorido-cor-preta-de-190846410.jpg"
                    alt="imagem colorida" />

                <div
                    onMouseDown={handleMouseDown}
                    onTouchMove={handleTouchMove}
                    style={{
                        left: `${imageRevealFraq * 47}%` ,
                        touchAction: "none"
                    }}
                    className={styles.boxTransition}>
                        <div className={styles.boxTransition__ObjetPath}>
                            <div className={styles.boxTransition__ObjetPath__path}></div>
                            <div className={styles.boxTransition__ObjetPath__ball}></div>
                        </div>
                </div>
            </div>

        </div>
    )
}
