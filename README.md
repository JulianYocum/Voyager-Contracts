# Mitigating Generative Agent Social Dilemmas
<div align="center">

This is the code for *Mitigating Generative Agent Social Dilemmas*.

[[Website]](https://voyager.minedojo.org/)
[[OpenReview]](https://openreview.net/forum?id=5TIdOk7XQ6)
[[PDF]](https://openreview.net/pdf?id=5TIdOk7XQ6)

______________________________________________________________________


</div>

In social dilemmas, individuals would be better off cooperating but fail to do so due to conflicting interests that discourage cooperation. Existing work on social dilemmas in AI has focused on standard agent design paradigms, most recently in the context of multi-agent reinforcement learning (MARL). However, with the rise of large language models (LLMs), a new design paradigm for AI systems has started to emerge—generative agents, in which actions performed by agents are chosen by prompting LLMs. This paradigm has seen recent success, such as Voyager, a highly capable Minecraft agent. In this work, we perform an initial study of outcomes that arise when deploying generative agents in social dilemmas. To do this, we build a multi-agent Voyager framework with a contracting and judgement mechanism based on formal contracting, which has been effective in mitigating social dilemmas in MARL. We then construct social dilemmas in Minecraft as the testbed for our open-source framework. Finally, we conduct preliminary experiments using our framework to provide evidence that contracting helps improve outcomes for generative agents in social dilemmas.


# Installation
The install directions are the same as the original Voyager code base, which you can find [here](https://github.com/MineDojo/Voyager).

# Getting Started

After the installation process, get the port number associated with your local Minecraft game, and then run

```python main.py --port {port#}```

# Paper and Citation

If you find our work useful, please consider citing us! 

```bibtex
@inproceedings{
      yocum2023mitigating,
      title={Mitigating Generative Agent Social Dilemmas},
      author={Julian Yocum and Phillip Christoffersen and Mehul Damani and Justin Svegliato and Dylan Hadfield-Menell and Stuart Russell},
      booktitle={NeurIPS 2023 Foundation Models for Decision Making Workshop},
      year={2023},
      url={https://openreview.net/forum?id=5TIdOk7XQ6}
      }
```
