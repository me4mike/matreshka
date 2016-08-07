import initMK from '../../_core/init';
import renderItemNode from './renderitemnode';
import triggerOne from '../../trigger/_triggerone';
import checkAlreadyRendered from './checkalreadyrendered';
import getAlreadyRendered from './getalreadyrendered';

export default function processSplice({
    self,
    selfDef,
    eventOptions,
    container
}) {
    const { added, removed, silent } = eventOptions;
    const addedLength = added.length;

    if(addedLength) {
        const nextIndex = self.lastIndexOf(added[addedLength -  1]) + 1;
        const next = self[nextIndex];
        let nextNode;
        if(next && typeof next === 'object') {
            nextNode = getAlreadyRendered({
                item: next,
                selfDef
            });
        }

        nofn.forEach(added, item => {
            if(item && typeof item === 'object') {
                checkAlreadyRendered({
                    item,
                    selfDef
                });

                const { node, itemEventOptions } = renderItemNode({
                    selfDef,
                    self,
                    item,
                    eventOptions
                });

                if(node) {
                    if(nextNode) {
                        container.insertBefore(node, nextNode);
                    } else {
                        container.appendChild(node);
                    }

                    if(!silent) {
                        triggerOne(item, 'afterrender', itemEventOptions);
                    }
                }
            }
        });
    }
}