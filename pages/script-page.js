import React from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const CREATE_SCRIPT_TAG = gql`
  mutation scriptTagCreate($input: ScriptTagInput!) {
    scriptTagCreate(input: $input) {
      scriptTag {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const QUERY_SCRIPTTAGS = gql`
  query {
    scriptTags(first: 5) {
      edges {
        node {
          id
          src
          displayScope
        }
      }
    }
  }
`;

const DELETE_SCRIPTTAG = gql`
  mutation scriptTagDelete($id: ID!) {
    scriptTagDelete(id: $id) {
      deletedScriptTagId
      userErrors {
        field
        message
      }
    }
  }
`;

const ScriptPage = () => {
  const [createScripts] = useMutation(CREATE_SCRIPT_TAG);
  const [deleteScripts] = useMutation(DELETE_SCRIPTTAG);

  const { loading, error, data } = useQuery(QUERY_SCRIPTTAGS);
  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;
  console.log("Script op", data);
  return (
    <div>
      <h1>these are Script tags </h1>
      <button
        type="submit"
        onClick={() => {
          createScripts({
            variables: {
              input: {
                src: "https://6f0a-103-5-191-124.ngrok.io/test-script.js",
                displayScope: "ALL",
              },
            },
            refetchQueries: [{ query: QUERY_SCRIPTTAGS }],
          });
        }}
      >
        Create Script Tag
      </button>
      {data.scriptTags.edges.map((item) => {
        return (
          <div key={item.node.id}>
            <p>{item.node.id}</p>
            <button
              type="submit"
              onClick={() => {
                deleteScripts({
                  variables: {
                    id: item.node.id,
                  },
                  refetchQueries: [{ query: QUERY_SCRIPTTAGS }],
                });
              }}
            >
              Delete Script Tag
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ScriptPage;
