const DOMMutationListener = _.throttle(editEventsStyle, 200)
const observer = new MutationObserver(DOMMutationListener)
observer.observe(document, { childList: true, subtree: true })

function editEventsStyle() {
    if (inMonthView()) {
        const eventElements = document.querySelectorAll('div[data-eventchip]>div[role="button"]')
        Array.from(eventElements).forEach(element => {
            const bgColor = element.style.backgroundColor
            if (bgColor != "" && bgColor != "white") {
                element.style.borderWidth = "1.5px"
                element.style.borderColor = bgColor
                element.style.backgroundColor = "white"
                // Change white text color to black.
                // (This leaves past events with greyed out text as is).
                if (getComputedStyle(element).color == "rgb(255, 255, 255)") {
                    element.style.color = "black"
                }
            }
        })
    }
}

function inMonthView() {
    // We cannot use URL for this check, as it sometimes ends in just "/calendar/r/", instead of "/calendar/r/month/".
    return document.querySelector('div[data-active-view="month"]') != null
}
