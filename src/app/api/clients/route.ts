import { NextResponse } from "next/server";
import ClientsController from "@/controllers/client.controller";
import { Client } from "@/types/types";

export async function POST(req: Request) {
  const newClient: Client = await req.json();
  try {
    const result = await ClientsController.post(newClient);
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
}

export async function GET() {
  try {
    const result = await ClientsController.get();
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
}

export async function PUT(req: Request) {
  const updatedClient: Client = await req.json();
  try {
    const result = ClientsController.put(updatedClient);
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    );
  }
}
