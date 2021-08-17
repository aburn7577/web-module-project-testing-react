import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Display from "../Display";
import mockFetchShow from "../../api/fetchShow";

jest.mock("../../api/fetchShow");

const testShow = {
    //add in approprate test data structure here.
    name: "Show",
    summary: "Summary of show",
    seasons: [
        { id: 0, name: "Season 1", episodes: [] },
        { id: 1, name: "Season 2", episodes: [] },
        { id: 2, name: "Season 3", episodes: [] },
        { id: 3, name: "Season 4", episodes: [] },
    ]
};

test("Test Display component renders without any props", () => {
    render(<Display />);
});

test("Test when the fetch button is pressed, show component will display", async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    render(<Display />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() => {
        const showData = screen.getByTestId("show-container");
        expect(showData).toBeInTheDocument();
    });
});

test("Test when fetch button is pressed, options rendered is equal to the seasons in test data", async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    render(<Display />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() => {
        const options = screen.getAllByTestId("season-option");
        expect(options).toHaveLength(4);
    });
});

test("Test when fetch button pressed, function is called", async () => {
    const mockDisplayFn = jest.fn();
    mockFetchShow.mockResolvedValueOnce(mockDisplayFn);
    render(<Display />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() => {
        expect(mockDisplayFn).toHaveBeenCalled();
    });
});

///Tasks:
//1. Add in necessary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.