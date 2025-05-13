import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { getUserData } from "../user";

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.pathname.split("/")[1];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user_id, resume, clerkUser } = await getUserData(username);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { searchParams } = new URL(request.url);

    const name = resume?.resumeData?.header?.name;
    const role = resume?.resumeData?.header?.subheader;
    const location = resume?.resumeData?.header?.location;
    const website = `https://quikres.vercel.app/${username}`;

    // Use profile image from Clerk user
    const profileImageUrl = clerkUser?.imageUrl;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            padding: "80px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              position: "absolute",
              top: 60,
              left: 80,
              right: 0,
              paddingRight: 40,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src='https://quikres.vercel.app/logo.png'
                alt='Quik|Res Logo'
                style={{
                  width: "144px",
                  height: "46px",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "24px",
                color: "#666",
                textAlign: "right",
              }}
            >
              {location}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              marginTop: "40px",
              height: "480px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "60%",
                paddingRight: "40px",
              }}
            >
              <h1
                style={{
                  fontSize: "72px",
                  fontWeight: "semibold",
                  margin: "0 0 20px 0",
                  color: "#222",
                  lineHeight: 1.1,
                }}
              >
                {name}
              </h1>
              <p
                style={{
                  fontSize: "32px",
                  color: "#444",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {role && role?.length > 90
                  ? `${role?.substring(0, 90)}...`
                  : role}
              </p>
            </div>

            <div
              style={{
                width: "40%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={profileImageUrl || "/images/placeholder.svg"}
                alt='Profile'
                style={{
                  width: "360px",
                  height: "360px",
                  borderRadius: "16px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 20,
              fontSize: "24px",
              color: "#666",
            }}
          >
            {website}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    console.log(message);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
