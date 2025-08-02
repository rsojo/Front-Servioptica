import { GetFaqActivesResponse } from "./type";

//const devUrl = "https://apitrazabilidadco.essilorluxottica.com";
const devUrl = process.env.REACT_APP_BASE_URL

export async function getFaqActives(): Promise<GetFaqActivesResponse> {
  const url = `${devUrl}/api/faqs/getActives`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const responseData: GetFaqActivesResponse = await response.json();
    // console.log("[getFaqActives] [responseData]", responseData);
    return responseData;
  } catch (error: any) {
    return error;
  }
}

export async function getFaqAdmin(
  token: string
): Promise<GetFaqActivesResponse> {
  const url = `${devUrl}/api/faqs`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData: GetFaqActivesResponse = await response.json();
    // console.log("[getFaqAdmin] [responseData]", responseData);
    return responseData;
  } catch (error: any) {
    console.error("[getFaqAdmin] [error]", error);
    return error;
  }
}

export async function addFaqAdmin({
  token,
  question,
  answer,
  state,
}: {
  token: string;
  question: string;
  answer: string;
  state: string;
}): Promise<GetFaqActivesResponse> {
  const url = `${devUrl}/api/faqs`;
  // console.log("[addFaqAdmin] [PREV]", { question, answer });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ question: question, answer: answer, status: state === "Active" ? 1 : 0  }),
    });

    const responseData: GetFaqActivesResponse = await response.json();
    // console.log("[addFaqAdmin] [responseData]", responseData);

    return responseData;
  } catch (error: any) {
    console.error("[addFaqAdmin] [error]", error);
    return error;
  }
}

export async function updateFaqAdmin(props: {
  token: string;
  id: number;
  question: string;
  answer: string;
  state: string;
}): Promise<any> {
  const { token, id, state, ...data } = props;
  const newData = { ...data, status: state === "Active" ? 1 : 0 }
  const url = `${devUrl}/api/faqs/${id}`;
  console.log("[updateFaqAdmin] [PREV]", newData);

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });
    // console.log("[updateFaqAdmin] [response]", await response.json());
    if (response.status !== 200) {
      return false;
    }
    return true;
  } catch (error: any) {
    console.error("[updateFaqAdmin] [error]", error);
    return error;
  }
}

export async function removeFaqAdmin({
  token,
  id,
}: {
  token: string;
  id: number;
}): Promise<any> {
  const url = `${devUrl}/api/faqs/${id}`;
  // console.log("[removeFaqAdmin] [PREV]", id);

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: id }),
    });
    // console.log("[removeFaqAdmin] [response]", response);
    if (response.status !== 204) {
      return false;
    }
    return true;
  } catch (error: any) {
    console.error("[removeFaqAdmin] [error]", error);
    return error;
  }
}
