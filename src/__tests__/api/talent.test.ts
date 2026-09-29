import { createMocks } from "node-mocks-http";
import handler from "@/pages/api/talent";
import { connectToDatabase } from "@/lib/mongodb";
import Talent from "@/models/Talent";

jest.mock("@/lib/mongodb", () => ({
  connectToDatabase: jest.fn(),
}));

jest.mock("@/models/Talent", () => ({
  find: jest.fn(),
}));

jest.mock("next-auth/jwt", () => ({
  getToken: jest.fn(),
}));

describe("Talent API", () => {
  it("returns talent profiles with GET", async () => {
    const mockTalents = [
      {
        _id: "123",
        category: "Models",
        location: "Prishtina",
      },
    ];

    (Talent.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockTalents),
        }),
      }),
    });

    const { req, res } = createMocks({
      method: "GET",
    });

    await handler(req, res);

    expect(connectToDatabase).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockTalents);
  });
});