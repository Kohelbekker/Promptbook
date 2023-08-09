import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    console.log(params.id);
    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) return new Response('prompt not found', { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch prompt', { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existPrompt = await Prompt.findById(params.id);

    if (!existPrompt) return new Response('Prompt not found!', { status: 404 });

    existPrompt.prompt = prompt;
    existPrompt.tag = tag;

    await existPrompt.save();

    return new Response(JSON.stringify(existPrompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to update prompt!', { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response('Prompt deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete prompt', { status: 500 });
  }
};
