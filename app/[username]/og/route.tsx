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
            backgroundColor: "#F5F5F5",
            padding: "50px 100px 100px 100px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "560px",
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
                  fontSize: "60px",
                  fontWeight: "900",
                  color: "#222",
                  margin: "0 0 6px 0",
                  lineHeight: 1.1,
                }}
              >
                {name}
              </h1>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#444",
                  margin: "0 0 8px 4px",
                  lineHeight: 1.4,
                }}
              >
                {role && role?.length > 90
                  ? `${role?.substring(0, 90)}...`
                  : role}
              </p>
              <div
                style={{
                  fontSize: "20px",
                  color: "#666",
                  margin: "0 0 24px 4px",
                  lineHeight: 1.4,
                }}
              >
                {location}
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "900",
                  color: "#222",
                  margin: "0 0 60px 4px",
                  lineHeight: 1.1,
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
                  alt='Quik|Res Logo'
                  style={{
                    width: "48px",
                    height: "48px",
                  }}
                />
              </div>
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
