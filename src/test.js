import Resolver from "@forge/resolver";
import api, { storage, route } from "@forge/api";

const resolver = new Resolver();

const getUniqueId = () => "_" + Math.random().toString(36).substr(2, 9);

const getListKeyFromContext = (context) => {
  const { localId: id } = context;
  return id.split("/")[id.split("/").length - 1];
};

const getAll = async (listId) => {
  return (await storage.get(listId)) || [];
};

resolver.define("get-all", ({ context }) => {
  return getAll(getListKeyFromContext(context));
});

resolver.define("create", async ({ payload, context }) => {
  const listId = getListKeyFromContext(context);
  const tests = await getAll(listId);
  const id = getUniqueId();

  const newTest = {
    id,
    ...payload,
  };

  await storage.set(getListKeyFromContext(context), [...tests, newTest]);

  return getAll(getListKeyFromContext(context));
});

resolver.define("delete", async ({ payload, context }) => {
  const listId = getListKeyFromContext(context);
  let tests = await getAll(listId);

  tests = tests.filter((item) => item.id !== payload.id);

  await storage.set(getListKeyFromContext(context), tests);

  return getAll(getListKeyFromContext(context));
});

resolver.define("copy-issue", async ({ payload, context }) => {
  const {
    extension: {
      issue: { id },
    },
  } = context;

  const requestURL = route`/rest/api/3/issue/${id}`;

  const res = await api.asApp().requestJira(requestURL);

  const data = await res.json();

  return data;
});

export const handler = resolver.getDefinitions();
