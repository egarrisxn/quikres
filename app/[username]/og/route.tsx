import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { getUserData } from "../user";

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.pathname.split("/")[1];
    const { resume, clerkUser } = await getUserData(username);
    const website = `https://quikres.vercel.app/${username}`;
    const profileImageUrl = clerkUser?.imageUrl;
    const name = resume?.resumeData?.header?.name;
    const role = resume?.resumeData?.header?.subheader;
    const location = resume?.resumeData?.header?.location;

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
            backgroundImage:
              "linear-gradient(to bottom, #fff1eb 0%, #ace0f9 100%)",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "0px 50px 50px 50px",
              width: "auto",
              maxWidth: 1050,
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                justifyContent: "center",
                width: "50%",
              }}
            >
              <div
                style={{
                  fontSize: "48px",
                  fontWeight: "900",
                  margin: "0 0 4px 0",
                  letterSpacing: -3,
                  lineHeight: 1.2,
                }}
              >
                {name}
              </div>
              <p
                style={{
                  fontSize: "26px",
                  fontWeight: "700",
                  color: "#444",
                  letterSpacing: -2,
                  lineHeight: 1.2,
                  margin: "0 0 8px 4px",
                }}
              >
                {role && role?.length > 90
                  ? `${role?.substring(0, 90)}...`
                  : role}
              </p>
              <div
                style={{
                  fontSize: "16px",
                  color: "#666",
                  lineHeight: 1.4,
                  margin: "0 0 20px 4px",
                }}
              >
                {location}
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "900",
                  color: "#222",
                  letterSpacing: -1,
                  lineHeight: 1.1,
                  margin: "0 0 80px 4px",
                }}
              >
                {website}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 0 0 4px",
                }}
              >
                <img
                  src='https://quikres.vercel.app/icons/icon.png'
                  alt='QuikRes Logo'
                  style={{
                    width: "48px",
                    height: "48px",
                  }}
                />
              </div>
            </div>
            <div
              style={{
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
