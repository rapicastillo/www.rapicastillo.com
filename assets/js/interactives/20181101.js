---
---

// Start Javascript
const candidates = [{% for candidate in site.data.interactives.state-senate-2018-candidates %}
  {
    "id": {{ candidate.id }},
    "name": "{{ candidate.name }}",
    "image": "{{ candidate.image }}",
    "district": {{ candidate.sd }},
    "is_incumbent": "{{ candidate.is_incumbent }}",
    "party": "{{ candidate.party }}"
  }{% if forloop.last == false %},{% endif %}
{% endfor %}].filter(i => i.is_incumbent !== "NR");


const dists = [{% for district in site.data.interactives.state-senate-2018 %}
  {
    "district": {{ district.id }},
    "counties": "{{ district.counties }}",
    "x": {{ district.hex_x }},
    "y": {{ district.hex_y }},
    "rating": "{{ district.safety }}"
  }{% if forloop.last == false %},{% endif %}
{% endfor %}];

const ratings = [{% for rating in site.data.interactives.ratings %}
  {
    "rating": "{{ rating.rating }}",
    "name": "{{ rating.name }}",
    "color": "{{ rating.color }}"
  }{% if forloop.last == false %},{% endif %}
{% endfor %}];

const getColor = (rating) => {
  switch (rating) {
    case 'DDD': return '#282db8';
    case 'DD': return '#79bbf0';
    case 'D' : return '#d4f1ff';
    case 'T': return '#fff4be';
    case 'R': return '#ffeef3';
    case 'RR': return '#db8295';
    case 'RRR': return '#962e2e';
    case 'W': return '#000000';
  }
}


const renderRating = (rating) => {
  const r = ratings.filter(r=>r.rating == rating)[0];

  return `<span class='h-rating h-${r.rating.toLowerCase()}'>${r.name}</span>`;
}

const groupedDistricts = dists.reduce((c, d) => {
  if (!!c[d.rating]) {
    c[d.rating].push(d)
  } else {
    c[d.rating] = [d];
  }
  return c;
}, {});

const renderCandidates = (district) => {
  const inDistrict = candidates.filter(d => d.district == district);

  return inDistrict.map(d => `
            <div class='${d.party && d.party.split(',').map(i=>`pty-${i.trim()}`).join(' ')}'>
              <span class='candidate-image' style='background-image: url(${d.image})'></span>
              <span class='name'>

                ${d.name} ${d.is_incumbent == "Y" && '<span class="incumbent">*</span>' || ''} (${d.party})
              </span>
            </div>
          `).join('');
}

document.addEventListener("DOMContentLoaded", () => {
  const width = 600, height = 510, radius=20;
  const container = d3.select("#interactive").append("div").attr("id", "hex-map");
  const hexbin = d3.hexbin()
                    .radius(radius)
                    .extent([[0, 0], [width, height]]);

  const scale = d3.scaleLinear().domain([0, dists.length]).range([0, width]);
  const svg = container.append("svg").attr("width", width).attr("height", height);
  const hoverHex = d3.select("#hover-hex");

  const groups = svg.append("g")
    .selectAll("path")
      .data(dists)
      .enter()
        .append("g")
        .on("mouseover", d => {
          console.log("Mouseover", d);
          hoverHex.style("top", `${d3.event.pageY}px`);
          hoverHex.style("left", `${d3.event.pageX}px`);
          hoverHex.style("visibility", 'visible');
          hoverHex.html(`
              ${renderRating(d.rating)}
              <h3>Senate District ${d.district}</h3>
              <h5>${d.counties}</h5>
              <div class='candidates'>
                ${renderCandidates(d.district)}
              </div>
            `);
        })
        .on("mouseout", d => {
          hoverHex.style("visibility", 'hidden');
          console.log("Mouseout", d);
        });

  groups.append("path")
    .attr("d", hexbin.hexagon())
    .attr("transform", d => `translate(${(d.x * radius)}, ${(d.y * radius) + (15 * d.y)})`)
    .attr("class", d => `hex hex-${d.rating.toLowerCase()}`)
    .attr("stroke", d => getColor(d.rating))
    .attr("fill", d => getColor(d.rating));
  groups.append("text")
    .text(d=>d.district)
    .attr('class', d=> `lbl lbl-${d.rating.toLowerCase()}`)
    .attr("transform", d => `translate(${(d.x * radius)}, ${(d.y * radius) + (15 * d.y)})`)

  let x = 0;
  const bar = svg.append("g")
                .selectAll("rect")
                .data(ratings.filter(r=>!!groupedDistricts[r.rating]))
                  .enter()
                    .append("rect")
                      .attr("height", 20)
                      .attr("width", d => {if(!groupedDistricts[d.rating]) { return null}
                          console.log(d); return scale(groupedDistricts[d.rating].length)})
                      .attr("fill", d => d.color)
                      .attr("x", d=>{
                        if(!!groupedDistricts[d.rating]) {
                          const ret = x;
                          console.log(x, scale(x));
                          x += groupedDistricts[d.rating].length;
                          return scale(ret);
                        }
                        return null;
                      })
                      .attr("y", d=>height-30)

  const line = svg.append("rect")
                  .attr('x', scale(32))
                  .attr('y', height-50)
                  .attr('width', 1)
                  .attr('height', 40)
  const note = svg.append("text")
                  .attr('x', scale(32) - 5)
                  .attr('y', height-40)
                  .text('32 seats to control the senate')
                  .attr('class', 'text-note')
});
