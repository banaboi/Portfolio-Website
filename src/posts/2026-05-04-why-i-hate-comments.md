---
title: Why I hate comments
date: 2026-05-04
summary: University trained me to write comments. Industry untrained me. A short rant about why most comments are noise — and the small handful worth keeping.
tags: ["opinion", "code-quality", "cpp"]
---

Every coding assignment I submitted at university had a portion of the mark
allocated to "code quality" — and a chunk of that was always comments. Markers
wanted to see them. So I wrote them.

In first year it felt right. A comment was a free signal that you understood
your own code. Future-me would be grateful for the line-by-line tour.
Marker-me would have less work to do. It seemed like the obvious move.

After a couple of years writing production C++ for a living, I think I was
almost entirely wrong.

## Comments that describe code are a smell

The first thing I noticed: in every codebase I respected, well-written
functions had almost no comments inside them. The code itself read clearly. If
you found yourself reaching for a comment to explain *what* a block of code
does, that was usually a sign the code wasn't doing a good enough job
explaining itself.

Look at this:

```cpp
// Loop through all the patients and increment the counter
// if their device has reported in the last 5 minutes
int active = 0;
for (size_t i = 0; i < patients.size(); ++i) {
    if (now() - patients[i].last_seen < 300) {
        active++;
    }
}
```

The comment isn't *wrong*. It's just redundant — and worse, it's the only
clue the reader gets, because the code itself is mute. Compare:

```cpp
constexpr auto kActiveWindow = std::chrono::minutes{5};

const auto active = std::count_if(
    patients.begin(), patients.end(),
    [](const Patient& p) { return p.is_active_within(kActiveWindow); }
);
```

No comment. The names carry the meaning. `is_active_within` is a contract you
can read once and trust. `kActiveWindow` tells you the threshold and its units
without needing a sentence above it.

The general rule I try to follow now: **if you want to write a comment, first
try to rename a variable, extract a function, or pick a better type.** The
comment is usually the lazy way out.

## Comments rot

The second problem is worse. Comments are not type-checked. They are not
executed. The compiler will happily let them lie to you forever.

Here's a real pattern I've seen:

```cpp
// Returns the timeout in milliseconds
int get_keepalive() {
    return config.keepalive_seconds;
}
```

Someone changed the unit from milliseconds to seconds. They renamed the field.
They updated every caller. They did *not* update the comment, because the
comment isn't part of the build. Now the next person to read this function has
to choose: trust the comment, or trust the code? They'll pick wrong half the
time.

A function with no comment is a function that can never lie. A function with a
stale comment is a trap.

## Comments mislead

The third failure mode is the meanest. Comments often try to describe how a
piece of code relates to *something else* — and that relationship is exactly
the kind of thing that quietly drifts out of date.

```cpp
// This must match the order of the columns in `patient_table` in db.sql
constexpr std::array<const char*, 4> kColumns = {
    "id", "name", "last_seen", "device_id"
};
```

Sounds helpful. But there's no enforcement. Six months from now somebody adds
a column to `patient_table` and forgets this array exists. The comment is still
true in spirit and a complete lie in fact. The reader sees the comment, trusts
it, and ships a bug.

The ones that say "called from X" or "see also Y" are even worse — refactors
move things around, and the reference points to nothing.

## When a comment is actually worth keeping

I haven't sworn off comments entirely. The ones I leave in look different. They
explain things the code physically cannot:

```cpp
// HACK: GCC 11.2 mis-optimises this loop with -O3 when the bound is
// constexpr. Pinning to int silences it. Tracked in internal bug #4471.
for (int i = 0; i < static_cast<int>(samples.size()); ++i) {
    process(samples[i]);
}
```

That comment is doing work no code can do: it's telling you *why* the
otherwise-pointless cast exists, what happens if you remove it, and where to
look if you want the full story. That's a comment that earns its place.

The shape I try to keep is roughly:

- **Why, not what.** The code says what. The comment says why.
- **Invariants the type system can't express.** "This vector must always be
  sorted by `last_seen`." The code can't tell you that. A comment can.
- **Workarounds.** Compiler bugs, vendor quirks, deliberate ugliness.
- **Public-API docs.** A Doxygen/JSDoc block on a public function describes a
  *contract*, not the code that implements it. Those are useful for the same
  reason the function signature is useful: they're the interface other people
  read instead of your internals.

Everything else is a candidate for deletion.

## The exam I never sat

University taught me that comments were a deliverable. Industry taught me that
comments are a liability — they cost as much to maintain as the code they sit
next to, and they fail silently when neglected. The best code I read at work
isn't loud about itself. It just sits there, named precisely, doing exactly
what it says it does.

If I could go back, I'd write fewer comments and better names. The marker
might've docked me points. The next person to touch the code wouldn't have.
