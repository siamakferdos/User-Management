function buildElementTree(name, data, target, rootId){
    var myTree = new Tree(name, data, target);
                myTree.mapDataSource = {
                id : "ElementId",
                name: "Name",
                parentId : "ParentId",
                extraData : "ElementTypeId"
            }
            // myTree.rtl = true;
            myTree.extraData = [{ "1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACi0lEQVRIS2NkoDFgpLH5DCgWCGTsV/DXFSs3U+GTUJT4qMDM/J2DmeU7+4Fbx188//TyBzGOefWVr25zesMRmFq4BSDDWf8y3teR5WFYmKXDkDv/BoOXoQhDpLU4AxPjX4aPP14yXHy5huHqq70E7Tl0zcwWZgncApGU/Q26crz1ssIcDFcef2Hg52IBWxQ/7QrYwA0lBgy3X75hUBRjYdh9t5vh8cfLOC26+UD94JzYfgeQAhQL5EQ46x+//cEA8wXMcGSLQGwW5j8MH35eZ9hzr4vh59+vGBbhtICRkbEeZLingQjD9gtvwBrRDQdZysfJwrAoW5vh868XDHvudTK8/noPxRKcFvBzsdZbqwuADSfkC5BFIIdku4sxrL5ahmIJXh+AnAIyPM1ZhmHW3ic4fQHz3YpjLxiy3cUZ5p6NgwcXXgtAkQyygFhfwBLAl19PGZZdzgQ7iKAPYL6IsJJgALkQV1wgi1cGSjP8Z9/GcOnlWsIWkOMLUGIQ5mVgmHs2luHSXRnsyRSUipCTAyioQBiUL4jxBSjexMWOMCw7cZQ4C2DJFWRJS7gKQ83KOwQt4mD7wVC1sZE4C2BxAQoyYiO9PUqBYf+dZWcrPfJMMHIyehCBFIAMh+VuXMUIcmZcX6zPcPzulaueeoY6RFkAixMrNQGGY7c+gOMEX7x0b37A4GrAdtLPUMmCJAtAikFFBHJOB1l09OYHjIKxwFPuoL+pGGZhhy2IsBWZ6BYhxxEoJf3++29nnJ2UB8k+wGYZctDBLIqxkVzYH6+egGKBaOp+AwYGxvM4C3kCErDEAFL2m/m/4ocZjg9QLABxQLUayx8GsM3kgj8sDAtghmNYQK6h+PTRvFUBALqhhCjstFqMAAAAAElFTkSuQmCC" },
                { "2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsUlEQVQ4T+2TwQ2CMBhGv88FZAjDVUdgA+gIJjKHOAce3KCyASPolTiELsBnWqhpjOLNEz21f/K/Q/MeEZ1jaguQ1o+kq4i7u1JIQK4h99Z215lzWGMMqFNbkdwP+7hwBEhISGyGuQ5lZ6qvAPRoy5tpY3C41yubYYFsBsx/8AcPwDwo/G6jUxpQM2liaGH0vvExkXmA/WwhBlD00Yh6xTMJcDkLOJFcfopJ0gM9iji2J8j9rBGvvL1FAAAAAElFTkSuQmCC" },
                { "default": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACpElEQVR42oXTX0hTURwH8O/dVq5VMGq40Vx/yEGMQbKmWEKh1EtgoA89pJT1EP2jhkQMn8bU7CGlh8SItEgfMoMKhTKDkMQErQgtN6XNyrUbbW672+7+3T/dO+fNP1AHDudwzvl9OD9+5xAQmlwulymVyk0ymQz/axVG5ZbGXcWDGX/Y7QoE6ojcujYciZAsy0JGECAEiBBHYUMckZtzbALM5xPo6fBgz0sKbDzeLwHBhYVFIBe8GgJ4ZFzn0ft8HM0PaJy1+Dl6jHgiAaFwWAKWB8tyN0h7rmNkeBC2tiDKTT4cLeXGapxMlQREKGoNkB2FnvE/gvtDH047vCjU/ECrTY/ikzPloSjeSQAVjZIcx0nAUipsaASk6yFq7VNQEd/RXr8OtKED+w5UmYQ4lwTEYrG/QK5zcTcoTyfqGt4jHJjDHVsM0fwmaHYehslkKuB53icB8XicFBakYD7lR2r+Hi44xvBl+is6LgeR1FzEem0lzGYz1Gq1Tjj/SwJoml4E5HIQTASM7y4abo5i6K0bt84FkaerBKU6DqvVCq1WC4VCsRJIJBIkL9adZ8F+a0Zb50d0P5uF81QIOwotmEnVoqSkBEajMXvDNUAymSTFCR3xY/RFE2xNw7h0jMKhUj3ezNegqMgi5g2xUhyIzPYCvV4Afq8BfroH4Zt5Ctf0J1TsTWDAU4fdRjMMBgMCwQVsVKn4lhstVwb6+28LGC8BqVSKZBgGrc4zOGjZgM3bjkCts0KTr4NQIUxOTqGsbD/sdruzq+u+Q0hZzBgrAK/Xg4nxCVRXVyNPqcy+AxH1eL0g/ST/uK+3sae7x0FRFL/0uSQgnU5nU1j6kUTuFYrArGcuY792tf710Kv2RCIpBS8HFELf+o9fzArlDXJCzqs3/gBmNE0GKC9HDAAAAABJRU5ErkJggg==" }];

            myTree.allowMove = true;
            myTree.rtl = true;
            myTree.allowEditName = true;
          
            myTree.buildTree();
           
            return myTree;
        
}