import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    
    const dataPath = path.join(process.cwd(), "data.json");
    const fileContents = await fs.readFile(dataPath, "utf8");
    const data = JSON.parse(fileContents);
    
    const newMessage = {
      id: "msg-" + Date.now(),
      name: body.name,
      email: body.email,
      subject: body.subject || null,
      topic: "General",
      message: body.message,
      date: new Date().toISOString().replace("T", " ").slice(0, 16),
      read: false
    };
    
    if (!data.messages) {
      data.messages = [];
    }
    data.messages.push(newMessage);
    
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json({ error: 'Unable to save message' }, { status: 500 });
  }
}
