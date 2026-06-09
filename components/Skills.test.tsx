import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Skills from "./Skills";
import skillGroups, { skillIcons } from "../constants/skillsElements";

describe("<Skills />", () => {
    it("renders the section heading", () => {
        render(<Skills />);
        expect(
            screen.getByRole("heading", { level: 2, name: "Skills" }),
        ).toBeInTheDocument();
    });

    it("renders every category as a sub-heading", () => {
        render(<Skills />);
        for (const group of skillGroups) {
            expect(
                screen.getByRole("heading", { level: 3, name: group.category }),
            ).toBeInTheDocument();
        }
    });

    it("renders every skill name", () => {
        render(<Skills />);
        for (const group of skillGroups) {
            for (const item of group.items) {
                expect(screen.getByText(item.name)).toBeInTheDocument();
            }
        }
    });

    it("renders an svg icon only for items that declare a valid icon", () => {
        const { container } = render(<Skills />);
        const expectedIcons = skillGroups
            .flatMap((g) => g.items)
            .filter((i) => i.icon && skillIcons[i.icon]).length;
        expect(container.querySelectorAll("svg.skill-icon")).toHaveLength(
            expectedIcons,
        );
    });

    it("draws the declared path for an icon-bearing chip", () => {
        const { container } = render(<Skills />);
        const iconItem = skillGroups
            .flatMap((g) => g.items)
            .find((i) => i.icon && skillIcons[i.icon]);
        expect(
            iconItem,
            "expected at least one icon-bearing skill",
        ).toBeTruthy();

        const chip = within(container as HTMLElement)
            .getByText(iconItem!.name)
            .closest("li");
        const path = chip?.querySelector("svg.skill-icon path");
        expect(path).toHaveAttribute("d", skillIcons[iconItem!.icon!]);
    });
});
