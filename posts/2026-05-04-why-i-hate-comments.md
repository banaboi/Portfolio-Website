---
title: Why I hate comments
date: 2026-05-04
summary: University trained me to write comments. Industry untrained me. A short rant about why most comments are noise, and the small handful worth keeping.
tags: ["opinion", "code-quality", "cpp"]
---

At university, every coding assignment had a "code quality" mark, and a fat
slice of that was always comments. Markers wanted them. So I wrote them.

It felt right at the time. A comment was a free signal you understood your
own code. Future-me would thank present-me for the tour. Marker-me would have
less to puzzle out. Easy points.

A couple of years writing C++ for a living and I think I had it backwards.

## The "what" comments

In every codebase I've actually respected at work, the well-written functions
barely have any comments inside them at all. The code just reads. The first
time I caught myself reaching for a comment to explain what a loop was doing,
something clicked: the comment wasn't the problem, the loop was.

This is the kind of thing I used to write:

```cpp
// Loop through all the patients and increment the counter
// if their device has reported in the last 5 minutes
int active = 0;
for (size_t i = 0; i < patients.size(); ++i) {
    if (Now() - patients[i].m_lastSeen < 300) {
        active++;
    }
}
```

The comment isn't lying. It's just carrying meaning the code refused to
carry. Take the comment away and the code goes silent. The honest fix is to
push the meaning down into the code:

```cpp
constexpr auto activeWindow = std::chrono::minutes{5};

int active = 0;
for (const Patient& p : patients) {
    if (p.IsActiveWithin(activeWindow)) {
        ++active;
    }
}
```

Same loop, no comment needed. `IsActiveWithin` is a contract you read once
and trust. `activeWindow` tells you the threshold and the unit in one line.
Nothing left for a comment to add.

These days, when I feel a comment coming on, I make myself try a rename or an
extract first. Usually that's all it needed.

## The bigger problem: comments rot

Even when a "what" comment starts out true, it doesn't stay that way. The
compiler doesn't read comments. The tests don't run them. Nothing in your
toolchain stops a comment from quietly going wrong.

```cpp
// Returns the timeout in milliseconds
int GetKeepalive() {
    return m_config.m_keepaliveSeconds;
}
```

Somebody changed the unit. Renamed the field. Updated the callers. The
comment? Untouched, because nothing made them touch it. The next person
reading this has to choose between trusting the comment and trusting the
code, and a non-trivial number of times they'll guess wrong.

A function with no comment can't lie. A function with a stale comment is a
trap.

## The meanest case

The really nasty ones are the comments that point sideways at something else
in the codebase. Those are the comments most likely to drift, because the
thing they're describing isn't even on the same page.

```cpp
// This must match the order of the columns in `patient_table` in db.sql
constexpr std::array<const char*, 4> columns = {
    "id", "name", "last_seen", "device_id"
};
```

Sounds responsible. Nothing enforces it. Six months from now somebody adds a
column to `patient_table` and never opens this file. The comment still reads
fine and is now just wrong. Whoever inherits this trusts the comment and
ships a bug.

"Called from X." "See also Y." Same disease. Refactors move stuff, the
breadcrumbs end up pointing at empty rooms, and the only person hurt is the
one trying to use them.

## What I'll still write a comment for

I haven't sworn the things off. The ones I leave in look very different from
what I used to write. They explain things the code physically can't.

```cpp
// HACK: GCC 11.2 mis-optimises this loop with -O3 when the bound is
// constexpr. Pinning to int silences it. Tracked in internal bug #4471.
for (int i = 0; i < static_cast<int>(samples.size()); ++i) {
    Process(samples[i]);
}
```

That comment is doing work no amount of renaming or refactoring can do. It
tells you why a weird-looking cast is there, what happens if you tidy it
away, and where to go if you want the full story. Take it out and you've
made the code worse.

The other kinds I'll usually keep: a one-liner pinning down an invariant the
type system isn't enforcing ("this vector stays sorted by `m_lastSeen`"),
notes on a compiler bug or vendor quirk, and proper doc-comments on public
APIs (those are describing a contract for callers, not a tour of the
implementation, which is a different job entirely). Pretty much everything
else, I'd rather see deleted than maintained.

## Wrapping up

University treated comments as a deliverable. Work has treated them as
maintenance debt. They cost about as much to keep current as the code they
sit next to, except nobody ever notices when they go bad.

If I had the degree to do over, I'd write a lot fewer comments and a lot
better names. The marker might've taken some points. The poor person
inheriting the code wouldn't have.
