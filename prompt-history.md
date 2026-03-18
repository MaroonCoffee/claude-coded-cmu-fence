# Put all previous prompts in this file. Also describe CLAUDE.md changes

# CLAUDE.MD Version 1:
# CMU Fence schedule / social media platform

We want to make a basic website with HTML, the function is to let CMU students see in real-time what the interest is in painting the fence over the course of the next few weeks. Information about the fence can be found in the-fence-info.md. There will be a queue system where clubs/organizations can enter to pick a day for them to paint. Then, any individual can express interest in painting (i.e. going, not going, maybe).

Possible features:
- calendar + availabilites for fence painting schedule
- way for students to express interest in going to fence painting for different orgs (I'm attending button)
- gallery of past fences (we'll upload information about past fences in the future)
- Must put idea or layout of what final painted fence will look like 
- Dropdown menu for all these features
- Widget/smth for what weather will be on the calendar

Don't try to put everything on one page, try to split it across multiple pages like a typically social media site

# Prompt 1:
make the project described in CLAUDE.md

# CLAUDE.MD Version 2:
...
Log every prompt the user gives you in and also record changes to CLAUDE.md in prompt-history.md

# Prompt 2:
build the specified app in CLAUDE.md

Response: Built a full multi-page HTML/CSS/JS website with the following pages:
- index.html — Home/Feed with upcoming events, RSVP buttons, weather widget, stats
- calendar.html — Monthly calendar with event markers, weather forecast overlay, upcoming list
- queue.html — Queue registration form for orgs + table view with tabs
- gallery.html — Past fence gallery with search, filter, and submit form
- design.html — Fence design preview builder + upcoming designs list
- about.html — Fence history, official rules, timeline
- styles.css — Shared stylesheet
- app.js — Shared JS (localStorage data, RSVP logic, weather API, seed data)

