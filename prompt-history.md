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

# Prompt 3:
whenever one user on a separate device makes an input into the queue, another user can't see it so it's kinda useless. How can this be fixed when hosting on github pages? Or is there another tool we need to use to make this data propagate to other users?

Response: Migrated data layer from localStorage to Firebase Realtime Database so all users share the same live data. Changes:
- Created firebase-config.js (user must fill in their Firebase project credentials)
- Rewrote app.js DB object to use Firebase Realtime Database with real-time listeners
- Added Firebase SDK script tags to all 6 HTML pages
- Updated index.html, queue.html, calendar.html, gallery.html to use DB.listen() for real-time re-rendering
- Personal RSVP state (going/maybe/notgoing per user) kept in localStorage since there's no auth
- seedData() now writes to Firebase once instead of localStorage

# Prompt 4:
taking the system that we already have for counting the number of people going to a certain day of fence painting for a club, take that and instead of collecting the number of people, collect the names and an email (probably their Andrew email to restrict to CMU people) similar to partyful system of attendee list, include a button to expand an attendee list to show a list of people attending. Keep everything else of the website the same

Response: Replaced anonymous attendance counting with named attendee lists + Andrew email verification:
- app.js: Added user identity system (getCurrentUser, ensureUserIdentity, showUserModal, submitUserModal) — shows a modal on first RSVP asking for name + @andrew.cmu.edu email, stored in localStorage
- app.js: Updated setRsvp/_applyRsvp to store {name, email} objects in attendees arrays instead of strings
- app.js: Added toggleAttendeeList() and buildAttendeeListHTML() helpers
- app.js: Changed seed key to seeded_v2 to force reseed with {name,email} format attendees
- app.js: Nav bar updates to show logged-in user's name after identity is set
- styles.css: Added .btn-attendees, .attendee-list-panel, .attendee-list, .attendee-name, .attendee-email, .no-attendees styles
- index.html: Added "▾ See who's going" toggle button + collapsible attendee list panel in each event card
- calendar.html: Added attendee list toggle in the event detail panel
- design.html: Added attendee list toggle in the design detail panel
- queue.html: No changes needed (shows count only)

# Prompt 5:
Also lets remove the changes we made to incorporate firebase, we're not going to use a real database for now.

Response: Reverted data layer from Firebase back to localStorage:
- app.js: Replaced Firebase-backed DB object with a localStorage-backed version (same get/set/listen interface, data stored under cmufence_db_ prefix)
- app.js: Updated seedData() to check/set LocalDB seeded_v2 flag instead of Firebase ref
- Removed Firebase SDK script tags (firebase-app-compat.js, firebase-database-compat.js) and firebase-config.js references from all 6 HTML pages (index.html, calendar.html, queue.html, gallery.html, design.html, about.html)
- All features still work; data is now per-device via localStorage (no real-time cross-device sync)

# Prompt 6:
Change the fence design software to better represent what a fence looks like. It consists of 6 posts with 5 fence lengths in between these posts. Students should be able to write letters on the fence posts, and words on the fence lengths, or insert photos that can span across fence posts and fence lengths. We just want this to be more accurate to how a fence will actually be designed / visualized

Response: Fully rewrote design.html fence builder:
- Accurate fence structure: 6 posts (narrow, 54px) alternating with 5 sections (flex:1), top/bottom horizontal rails, green ground strip
- Posts extend visually through the rails via negative margin
- Each of the 11 segments is clickable; selected segment gets a yellow outline
- Small P1–P6 / S1–S5 labels appear on each segment for orientation
- Editor panel below the fence shows when a segment is selected:
  - Posts: short text input (letters/labels, max 8 chars), vertical text rendering
  - Sections: text input (words/phrases, max 60 chars), horizontal text rendering
  - Both: text color picker, paint color (palette swatches + custom color picker)
  - Image upload for any segment; span control to stretch image across N segments
  - Image overlay rendering uses getBoundingClientRect + absolute positioning for accurate spans
  - Clear segment / Clear All buttons
- Mini fence thumbnails used in saved design cards and upcoming queue cards
- Detail view for queue events shows a rendered mini-fence with org name/color

