import { createMocks } from "node-mocks-http";
import handler from "@/pages/api/casting";
import { connectToDatabase } from "@/lib/mongodb";
import CastingCall from "@/models/CastingCall";

jest.mock("@/lib/mongodb", () => ({
  connectToDatabase: jest.fn(),
}));

jest.mock("@/models/CastingCall", () => ({
  find: jest.fn(),
}));

describe("Casting API", () => {
  it("returns casting calls with GET", async () => {
    const mockCastingCalls = [
      {
        _id: "123",
        title: "Fashion Campaign",
        category: "Fashion",
      },
    ];

    (CastingCall.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockCastingCalls),
      }),
    });

    const { req, res } = createMocks({
      method: "GET",
    });

    await handler(req, res);

    expect(connectToDatabase).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockCastingCalls);
  });
});