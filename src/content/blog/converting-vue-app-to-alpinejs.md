---
title: "Converting a Vue 2 App to Alpine.js"
summary: "Ornare cum cursus laoreet sagittis nunc fusce posuere per euismod dis vehicula a, semper fames lacus maecenas dictumst pulvinar neque enim non potenti. Torquent hac sociosqu eleifend potenti."
description: "some description"
pubDate: "2023-02-15"
tags: ["Architecture", "Astro"]
coverImage: "../../assets/images/blog/vue.png"
coverAlt: "A picture of a villa"
---

A little over two years ago I published an "idle clicker game" built in Vue.js. I called it "IdleFleet" and was heavily inspired by games like A Dark Room, where I relied on simple text graphics and game mechanics that would change as you played. In my last session, I walked through the process of building a simple text game and brought up IdleFleet as an example. While playing the game to refresh my memory about what I actually built... I discovered I actually really liked it. I decided it would be good to give it some attention with new features and other updates, but before I could do that, I knew I needed to switch from Vue to Alpine.js.

### Why Vue to Alpine?

So, this is mostly my opinion, and feel free to skip to the next section, but as much as I respect Vue, I don't find it as appropriate these days for simpler web pages and non-"apps". I put "apps" in quotes because that means something different to different people. In general, when what you are building involves multiple different 'views' (a screen for X, a screen for Y), I generally consider that an app. A page with JavaScript for interactivity is simpler and Vue feels like overkill there. Alpine really fits the spot for these needs and that's part of the reason I've been so enamored of it the last year or so.

Also, and this is really now just an opinion, I kind of feel like Vue has lost some of its approachability it had in the older days. It's absolutely powerful, performant, and so forth, but I'm just finding myself a lot more comfortable with Alpine.

Ok, enough opinions, let's get into the process.

### The Previous Code

Before I get started, you can browse the Vue version of the repository here: https://github.com/cfjedimaster/IdleFleet/tree/820f1bea20a33b6f9248ebdc687f9ce7c93235bf. My changes primarily revolve around two files: index.html and app.js (although I made a small change in app.css as well).
