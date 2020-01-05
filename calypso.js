
const GCAL_BLACK = "rgb(60, 64, 67)"

const DOMMutationListener = _.throttle(editEventsStyle, 200)
const observer = new MutationObserver(DOMMutationListener)
observer.observe(document, { childList: true, subtree: true })

function editEventsStyle() {
    if (inMonthView()) {
        document.querySelectorAll('div[data-eventchip]>div[role="button"]')
        .forEach(eventElement => {
            const circleElement = eventElement.firstChild.querySelector("div[style]")
            if (circleElement != null) {
                circleElement.parentElement.style.display = "none"
                const circleColor = circleElement.style.borderColor
                eventElement.style.backgroundColor = circleColor
                // Change black text color to white.
                // (This leaves past events with greyed out text as is).
                if (getComputedStyle(eventElement).color == GCAL_BLACK) {
                    eventElement.style.color = "white"
                }
            }
        })
    }
}

function inMonthView() {
    // We cannot use URL for this check, as it sometimes ends in just "/calendar/r/", instead of "/calendar/r/month/".
    return document.querySelector('div[data-active-view="month"]') != null
}
