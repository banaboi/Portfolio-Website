import { describe, expect, it } from "vitest";
import skillGroups, { skillIcons } from "./skillsElements";

// SVG path data: must start with a moveto command and contain only the
// characters that make up valid path syntax. A malformed/empty string here
// means a broken icon on the page.
const VALID_PATH = /^[Mm][\s\d.,-]/;
const PATH_CHARS = /^[a-zA-Z\d.,\s-]+$/;

describe("skillIcons", () => {
    it("has at least one icon", () => {
        expect(Object.keys(skillIcons).length).toBeGreaterThan(0);
    });

    it.each(Object.entries(skillIcons))(
        "%s resolves to a well-formed SVG path",
        (_name, path) => {
            expect(path).toMatch(VALID_PATH);
            expect(path).toMatch(PATH_CHARS);
        },
    );
});

describe("skillGroups", () => {
    it("is a non-empty list", () => {
        expect(skillGroups.length).toBeGreaterThan(0);
    });

    it("has unique category names", () => {
        const categories = skillGroups.map((g) => g.category);
        expect(new Set(categories).size).toBe(categories.length);
    });

    it.each(skillGroups)("group '$category' is well-formed", (group) => {
        expect(group.category.trim()).not.toBe("");
        expect(group.items.length).toBeGreaterThan(0);

        const names = group.items.map((i) => i.name);
        expect(new Set(names).size, "duplicate skill in group").toBe(
            names.length,
        );

        for (const item of group.items) {
            expect(item.name.trim()).not.toBe("");
        }
    });

    // The bug that motivated these tests: an item can reference an icon key
    // that does not exist in `skillIcons`, which silently renders no icon.
    it("every item icon reference resolves to a defined path", () => {
        const dangling: string[] = [];
        for (const group of skillGroups) {
            for (const item of group.items) {
                if (item.icon && !skillIcons[item.icon]) {
                    dangling.push(`${item.name} -> ${item.icon}`);
                }
            }
        }
        expect(dangling, "icon refs with no matching path").toEqual([]);
    });
});

describe("skills content", () => {
    const allNames = skillGroups.flatMap((g) => g.items.map((i) => i.name));

    it.each([
        "Vercel",
        "Supabase",
        "Cloudflare",
        "Bluetooth",
        "RPC",
        "Antigravity IDE",
    ])("includes %s", (name) => {
        expect(allNames).toContain(name);
    });

    it.each(["IoT", "Device-to-Cloud Comms"])(
        "no longer includes %s",
        (name) => {
            expect(allNames).not.toContain(name);
        },
    );
});
