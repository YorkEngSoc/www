import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

type DeployResponseT = {
  job: {
    id: string;
    state: string;
    createdAt: number;
  };
};

export async function POST() {
  const session = await getServerSession(authOptions);
  if (session) {
    const deployHookURL = process.env.DEPLOY_HOOK!;
    return await fetch(deployHookURL, {
      method: "POST",
    })
      .then(async (res) => {
        const jsonRes = (await res.json()) as DeployResponseT;
        if (jsonRes && jsonRes.job) {
          return new Response(
            JSON.stringify({ message: "Rebuilding website" }),
            { status: 200 }
          );
        } else throw new Error("Invalid response from Vercel on Deploy Hook");
      })
      .catch((e) => {
        return new Response(JSON.stringify({ message: e.message }), {
          status: 500,
        });
      });
  }

  return new Response(JSON.stringify({ message: "Unauthorised" }), {
    status: 403,
  });
}
